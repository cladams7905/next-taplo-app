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
      Projects: {
        Row: {
          created_at: string
          id: number
          project_name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          project_name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          project_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      SessionData: {
        Row: {
          id: number
          is_active: boolean | null
          last_opened: string | null
          project_id: number | null
          user_id: string | null
        }
        Insert: {
          id?: number
          is_active?: boolean | null
          last_opened?: string | null
          project_id?: number | null
          user_id?: string | null
        }
        Update: {
          id?: number
          is_active?: boolean | null
          last_opened?: string | null
          project_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SessionData_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "SessionData_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      UserToasts: {
        Row: {
          bg_color: string | null
          bg_style: string | null
          content: string | null
          created_at: string
          event_type: string | null
          font: string | null
          id: number
          project_id: number
          screen_alignment: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          bg_color?: string | null
          bg_style?: string | null
          content?: string | null
          created_at?: string
          event_type?: string | null
          font?: string | null
          id?: number
          project_id: number
          screen_alignment?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          bg_color?: string | null
          bg_style?: string | null
          content?: string | null
          created_at?: string
          event_type?: string | null
          font?: string | null
          id?: number
          project_id?: number
          screen_alignment?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "UserToasts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserToasts_user_id_fkey"
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
      EventType:
        | "Email Subscribe"
        | "Purchase Complete"
        | "User Register"
        | "Custom"
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