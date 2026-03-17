
-- Courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  duration TEXT NOT NULL,
  total_seats INTEGER NOT NULL,
  description TEXT,
  affiliation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Branches table
CREATE TABLE public.branches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  seats INTEGER,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(course_id, code)
);

-- Academic years
CREATE TABLE public.academic_years (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year_label TEXT NOT NULL,
  year_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  roll_number TEXT NOT NULL UNIQUE,
  course_id UUID NOT NULL REFERENCES public.courses(id),
  branch_id UUID NOT NULL REFERENCES public.branches(id),
  year_id UUID NOT NULL REFERENCES public.academic_years(id),
  email TEXT,
  phone TEXT,
  admission_year INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subjects table
CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT,
  course_id UUID NOT NULL REFERENCES public.courses(id),
  branch_id UUID NOT NULL REFERENCES public.branches(id),
  year_id UUID NOT NULL REFERENCES public.academic_years(id),
  semester INTEGER,
  credits INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Attendance records
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id),
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  marked_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, subject_id, date)
);

-- Extracurriculars (sports, events, workshops)
CREATE TABLE public.extracurriculars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sports', 'event', 'workshop')),
  description TEXT,
  date DATE,
  course_id UUID REFERENCES public.courses(id),
  branch_id UUID REFERENCES public.branches(id),
  year_id UUID REFERENCES public.academic_years(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Student extracurricular participation
CREATE TABLE public.student_extracurriculars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  extracurricular_id UUID NOT NULL REFERENCES public.extracurriculars(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, extracurricular_id)
);

-- Assessments (exams, assignments, practicals, labs)
CREATE TABLE public.assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('exam', 'assignment', 'practical', 'lab')),
  subject_id UUID NOT NULL REFERENCES public.subjects(id),
  max_marks NUMERIC,
  date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Student assessment scores
CREATE TABLE public.student_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  marks_obtained NUMERIC,
  remarks TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, assessment_id)
);

-- Admin roles for teachers
CREATE TYPE public.app_role AS ENUM ('admin', 'teacher');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Teacher profiles
CREATE TABLE public.teacher_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  name TEXT NOT NULL,
  department TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Auto-assign teacher role on signup
CREATE OR REPLACE FUNCTION public.handle_new_teacher()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'teacher');
  INSERT INTO public.teacher_profiles (user_id, name) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'Teacher'));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_teacher();

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extracurriculars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_extracurriculars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_profiles ENABLE ROW LEVEL SECURITY;

-- Public read access for courses/branches/years
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Anyone can view branches" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Anyone can view academic_years" ON public.academic_years FOR SELECT USING (true);
CREATE POLICY "Anyone can view subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Anyone can view extracurriculars" ON public.extracurriculars FOR SELECT USING (true);

-- Teacher policies
CREATE POLICY "Teachers can view students" ON public.students FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can insert students" ON public.students FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can update students" ON public.students FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Teachers can manage subjects" ON public.subjects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Teachers can view attendance" ON public.attendance FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can mark attendance" ON public.attendance FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can update attendance" ON public.attendance FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Teachers can manage extracurriculars" ON public.extracurriculars FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can view student_extracurriculars" ON public.student_extracurriculars FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can manage student_extracurriculars" ON public.student_extracurriculars FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Teachers can view assessments" ON public.assessments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can manage assessments" ON public.assessments FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can view student_assessments" ON public.student_assessments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Teachers can manage student_assessments" ON public.student_assessments FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can view own profile" ON public.teacher_profiles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.teacher_profiles FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Seed courses
INSERT INTO public.courses (id, name, duration, total_seats, description, affiliation) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Diploma', '3 Years', 150, 'Foundation program in core engineering disciplines with practical training and industry exposure.', 'HSBTE'),
  ('a1000000-0000-0000-0000-000000000002', 'B.Tech', '4 Years', 270, 'Comprehensive undergraduate engineering program affiliated to DCRUST, Murthal.', 'DCRUST Murthal'),
  ('a1000000-0000-0000-0000-000000000003', 'M.Tech', '2 Years', 51, 'Advanced postgraduate program for specialized research and industry-ready expertise.', 'DCRUST Murthal'),
  ('a1000000-0000-0000-0000-000000000004', 'BCA', '3 Years', 120, 'Bachelor program focusing on software development, web technologies and AWS Academy.', 'MDU Rohtak');

-- Seed branches
INSERT INTO public.branches (course_id, name, code, seats, description) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Civil Engineering', 'CE', 30, 'Design and construction of infrastructure and buildings.'),
  ('a1000000-0000-0000-0000-000000000001', 'Computer Science & Engineering', 'CSE', 30, 'Software development, algorithms, and computing systems.'),
  ('a1000000-0000-0000-0000-000000000001', 'Electrical Engineering', 'EE', 30, 'Power systems, electrical machines, and control systems.'),
  ('a1000000-0000-0000-0000-000000000001', 'Electronics & Communication', 'ECE', 30, 'Communication systems, signal processing, and embedded systems.'),
  ('a1000000-0000-0000-0000-000000000001', 'Mechanical Engineering', 'ME', 30, 'Design, manufacturing, and thermal engineering.'),
  ('a1000000-0000-0000-0000-000000000002', 'Civil Engineering', 'CE', 54, 'Design and construction of infrastructure and buildings.'),
  ('a1000000-0000-0000-0000-000000000002', 'Computer Science & Engineering', 'CSE', 54, 'Software development, algorithms, and computing systems.'),
  ('a1000000-0000-0000-0000-000000000002', 'Electrical Engineering', 'EE', 54, 'Power systems, electrical machines, and control systems.'),
  ('a1000000-0000-0000-0000-000000000002', 'Electronics & Communication', 'ECE', 54, 'Communication systems, signal processing, and embedded systems.'),
  ('a1000000-0000-0000-0000-000000000002', 'Mechanical Engineering', 'ME', 54, 'Design, manufacturing, and thermal engineering.'),
  ('a1000000-0000-0000-0000-000000000003', 'Computer Science & Engineering', 'CSE', 17, 'Advanced research in AI, ML, and software systems.'),
  ('a1000000-0000-0000-0000-000000000003', 'Electrical Engineering', 'EE', 17, 'Advanced power systems and renewable energy research.'),
  ('a1000000-0000-0000-0000-000000000003', 'Electronics & Communication', 'ECE', 17, 'Advanced communication and VLSI design research.'),
  ('a1000000-0000-0000-0000-000000000004', 'Computer Applications', 'CA', 120, 'Software development, web technologies, and AWS Academy.');

-- Seed academic years
INSERT INTO public.academic_years (id, year_label, year_number) VALUES
  ('b1000000-0000-0000-0000-000000000001', '1st Year', 1),
  ('b1000000-0000-0000-0000-000000000002', '2nd Year', 2),
  ('b1000000-0000-0000-0000-000000000003', '3rd Year', 3),
  ('b1000000-0000-0000-0000-000000000004', '4th Year', 4);
