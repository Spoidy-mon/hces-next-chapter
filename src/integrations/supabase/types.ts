export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      academic_years: {
        Row: {
          created_at: string
          id: string
          year_label: string
          year_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          year_label: string
          year_number: number
        }
        Update: {
          created_at?: string
          id?: string
          year_label?: string
          year_number?: number
        }
        Relationships: []
      }
      assessments: {
        Row: {
          created_at: string
          date: string | null
          id: string
          max_marks: number | null
          subject_id: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: string
          max_marks?: number | null
          subject_id: string
          title: string
          type: string
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: string
          max_marks?: number | null
          subject_id?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          created_at: string
          date: string
          id: string
          marked_by: string | null
          status: string
          student_id: string
          subject_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          marked_by?: string | null
          status: string
          student_id: string
          subject_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          marked_by?: string | null
          status?: string
          student_id?: string
          subject_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          code: string
          course_id: string
          created_at: string
          description: string | null
          id: string
          name: string
          seats: number | null
        }
        Insert: {
          code: string
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          seats?: number | null
        }
        Update: {
          code?: string
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          seats?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "branches_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          affiliation: string | null
          created_at: string
          description: string | null
          duration: string
          id: string
          name: string
          total_seats: number
        }
        Insert: {
          affiliation?: string | null
          created_at?: string
          description?: string | null
          duration: string
          id?: string
          name: string
          total_seats: number
        }
        Update: {
          affiliation?: string | null
          created_at?: string
          description?: string | null
          duration?: string
          id?: string
          name?: string
          total_seats?: number
        }
        Relationships: []
      }
      extracurriculars: {
        Row: {
          branch_id: string | null
          course_id: string | null
          created_at: string
          date: string | null
          description: string | null
          id: string
          title: string
          type: string
          year_id: string | null
        }
        Insert: {
          branch_id?: string | null
          course_id?: string | null
          created_at?: string
          date?: string | null
          description?: string | null
          id?: string
          title: string
          type: string
          year_id?: string | null
        }
        Update: {
          branch_id?: string | null
          course_id?: string | null
          created_at?: string
          date?: string | null
          description?: string | null
          id?: string
          title?: string
          type?: string
          year_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "extracurriculars_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "extracurriculars_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "extracurriculars_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
        ]
      }
      student_assessments: {
        Row: {
          assessment_id: string
          created_at: string
          id: string
          marks_obtained: number | null
          remarks: string | null
          student_id: string
        }
        Insert: {
          assessment_id: string
          created_at?: string
          id?: string
          marks_obtained?: number | null
          remarks?: string | null
          student_id: string
        }
        Update: {
          assessment_id?: string
          created_at?: string
          id?: string
          marks_obtained?: number | null
          remarks?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_assessments_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_assessments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_extracurriculars: {
        Row: {
          created_at: string
          extracurricular_id: string
          id: string
          student_id: string
        }
        Insert: {
          created_at?: string
          extracurricular_id: string
          id?: string
          student_id: string
        }
        Update: {
          created_at?: string
          extracurricular_id?: string
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_extracurriculars_extracurricular_id_fkey"
            columns: ["extracurricular_id"]
            isOneToOne: false
            referencedRelation: "extracurriculars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_extracurriculars_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          admission_year: number | null
          branch_id: string
          course_id: string
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          roll_number: string
          updated_at: string
          year_id: string
        }
        Insert: {
          admission_year?: number | null
          branch_id: string
          course_id: string
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          roll_number: string
          updated_at?: string
          year_id: string
        }
        Update: {
          admission_year?: number | null
          branch_id?: string
          course_id?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          roll_number?: string
          updated_at?: string
          year_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          branch_id: string
          code: string | null
          course_id: string
          created_at: string
          credits: number | null
          id: string
          name: string
          semester: number | null
          year_id: string
        }
        Insert: {
          branch_id: string
          code?: string | null
          course_id: string
          created_at?: string
          credits?: number | null
          id?: string
          name: string
          semester?: number | null
          year_id: string
        }
        Update: {
          branch_id?: string
          code?: string | null
          course_id?: string
          created_at?: string
          credits?: number | null
          id?: string
          name?: string
          semester?: number | null
          year_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subjects_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subjects_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "academic_years"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_profiles: {
        Row: {
          created_at: string
          department: string | null
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "teacher"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "teacher"],
    },
  },
} as const
