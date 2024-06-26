export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      answer: {
        Row: {
          answer_id: number
          answer_order: number
          answer_text: string
          course_id: number
          is_correct: boolean
          question_id: number
          timestamp: string
        }
        Insert: {
          answer_id?: number
          answer_order: number
          answer_text: string
          course_id: number
          is_correct?: boolean
          question_id: number
          timestamp?: string
        }
        Update: {
          answer_id?: number
          answer_order?: number
          answer_text?: string
          course_id?: number
          is_correct?: boolean
          question_id?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "answer_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "answer_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["question_id"]
          },
        ]
      }
      category: {
        Row: {
          category_id: number
          category_name: string
          category_type: string
          course_id: number
          timestamp: string
        }
        Insert: {
          category_id?: number
          category_name: string
          category_type: string
          course_id: number
          timestamp?: string
        }
        Update: {
          category_id?: number
          category_name?: string
          category_type?: string
          course_id?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "catigory_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["course_id"]
          },
        ]
      }
      collection: {
        Row: {
          collection_id: number
          collection_name: string
          collection_order: number
          course_id: number
          is_hidden: boolean
          timestamp: string
        }
        Insert: {
          collection_id?: number
          collection_name: string
          collection_order: number
          course_id: number
          is_hidden?: boolean
          timestamp?: string
        }
        Update: {
          collection_id?: number
          collection_name?: string
          collection_order?: number
          course_id?: number
          is_hidden?: boolean
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["course_id"]
          },
        ]
      }
      course: {
        Row: {
          course_description: string | null
          course_end_date: string
          course_id: number
          course_name: string
          course_start_date: string
          timestamp: string
          user_id: string | null
        }
        Insert: {
          course_description?: string | null
          course_end_date: string
          course_id?: number
          course_name: string
          course_start_date: string
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          course_description?: string | null
          course_end_date?: string
          course_id?: number
          course_name?: string
          course_start_date?: string
          timestamp?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      deleted_record: {
        Row: {
          course_id: number
          deleted_record_id: number
          id: number
          id_column_name: string
          table_name: string
          timestamp: string
        }
        Insert: {
          course_id: number
          deleted_record_id: number
          id?: number
          id_column_name: string
          table_name: string
          timestamp?: string
        }
        Update: {
          course_id?: number
          deleted_record_id?: number
          id?: number
          id_column_name?: string
          table_name?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "deleted_record_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["course_id"]
          },
        ]
      }
      exam: {
        Row: {
          collection_id: number
          course_id: number
          exam_id: number
          exam_name: string
          exam_order: number
          is_hidden: boolean
          number_of_questions: number
          timestamp: string
        }
        Insert: {
          collection_id: number
          course_id: number
          exam_id?: number
          exam_name: string
          exam_order: number
          is_hidden?: boolean
          number_of_questions?: number
          timestamp?: string
        }
        Update: {
          collection_id?: number
          course_id?: number
          exam_id?: number
          exam_name?: string
          exam_order?: number
          is_hidden?: boolean
          number_of_questions?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "exam_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["course_id"]
          },
        ]
      }
      paragraph: {
        Row: {
          course_id: number
          is_hidden: boolean
          paragraph_id: number
          paragraph_text: string | null
          paragraph_title: string | null
          timestamp: string
        }
        Insert: {
          course_id: number
          is_hidden?: boolean
          paragraph_id?: number
          paragraph_text?: string | null
          paragraph_title?: string | null
          timestamp?: string
        }
        Update: {
          course_id?: number
          is_hidden?: boolean
          paragraph_id?: number
          paragraph_text?: string | null
          paragraph_title?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "paragraph_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["course_id"]
          },
        ]
      }
      question: {
        Row: {
          category_id: number | null
          course_id: number
          is_hidden: boolean
          paragraph_id: number | null
          question_answer_explination: string | null
          question_hint: string | null
          question_id: number
          question_text: string | null
          timestamp: string
        }
        Insert: {
          category_id?: number | null
          course_id: number
          is_hidden?: boolean
          paragraph_id?: number | null
          question_answer_explination?: string | null
          question_hint?: string | null
          question_id?: number
          question_text?: string | null
          timestamp?: string
        }
        Update: {
          category_id?: number | null
          course_id?: number
          is_hidden?: boolean
          paragraph_id?: number | null
          question_answer_explination?: string | null
          question_hint?: string | null
          question_id?: number
          question_text?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "question_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "question_paragraph_id_fkey"
            columns: ["paragraph_id"]
            isOneToOne: false
            referencedRelation: "paragraph"
            referencedColumns: ["paragraph_id"]
          },
        ]
      }
      question_exam: {
        Row: {
          course_id: number
          exam_id: number
          question_exam_id: number
          question_id: number
          question_order: number
          timestamp: string
        }
        Insert: {
          course_id: number
          exam_id: number
          question_exam_id?: number
          question_id: number
          question_order: number
          timestamp?: string
        }
        Update: {
          course_id?: number
          exam_id?: number
          question_exam_id?: number
          question_id?: number
          question_order?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_exam_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "question_exam_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exam"
            referencedColumns: ["exam_id"]
          },
          {
            foreignKeyName: "question_exam_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["question_id"]
          },
        ]
      }
      question_tag: {
        Row: {
          course_id: number
          question_id: number
          question_tag_id: number
          tag_id: number
          timestamp: string
        }
        Insert: {
          course_id: number
          question_id: number
          question_tag_id?: number
          tag_id: number
          timestamp?: string
        }
        Update: {
          course_id?: number
          question_id?: number
          question_tag_id?: number
          tag_id?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_tag_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "question_tag_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["question_id"]
          },
          {
            foreignKeyName: "question_tag_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tag"
            referencedColumns: ["tag_id"]
          },
        ]
      }
      tag: {
        Row: {
          course_id: number
          tag_color: string
          tag_id: number
          tag_text: string
          timestamp: string
        }
        Insert: {
          course_id: number
          tag_color: string
          tag_id?: number
          tag_text: string
          timestamp?: string
        }
        Update: {
          course_id?: number
          tag_color?: string
          tag_id?: number
          tag_text?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "tag_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["course_id"]
          },
        ]
      }
      version: {
        Row: {
          course_id: number
          privilage_needed: boolean
          table_name: string
          table_version: string
          timestamp: string
          user_id: string | null
        }
        Insert: {
          course_id: number
          privilage_needed: boolean
          table_name: string
          table_version?: string
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          course_id?: number
          privilage_needed?: boolean
          table_name?: string
          table_version?: string
          timestamp?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "version_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "version_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
