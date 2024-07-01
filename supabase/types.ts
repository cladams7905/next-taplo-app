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
      Integrations: {
        Row: {
          api_key: string | null
          created_at: string
          id: number
          name: string | null
          provider: string | null
          user_id: string | null
        }
        Insert: {
          api_key?: string | null
          created_at?: string
          id?: number
          name?: string | null
          provider?: string | null
          user_id?: string | null
        }
        Update: {
          api_key?: string | null
          created_at?: string
          id?: number
          name?: string | null
          provider?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Integrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Products: {
        Row: {
          created_at: string
          currency: string | null
          id: number
          link: string | null
          name: string | null
          price: number | null
          toast_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          currency?: string | null
          id?: number
          link?: string | null
          name?: string | null
          price?: number | null
          toast_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          currency?: string | null
          id?: number
          link?: string | null
          name?: string | null
          price?: number | null
          toast_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Products_toast_id_fkey"
            columns: ["toast_id"]
            isOneToOne: false
            referencedRelation: "Toasts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Toasts: {
        Row: {
          accent_color: string | null
          bg_color: string | null
          border_color: string | null
          content: string | null
          created_at: string
          event_type: string | null
          id: number
          integration_id: number | null
          screen_alignment: string | null
          show_products: boolean
          text_color: string | null
          title: string | null
          user_id: string | null
          verified_color: string | null
        }
        Insert: {
          accent_color?: string | null
          bg_color?: string | null
          border_color?: string | null
          content?: string | null
          created_at?: string
          event_type?: string | null
          id?: number
          integration_id?: number | null
          screen_alignment?: string | null
          show_products?: boolean
          text_color?: string | null
          title?: string | null
          user_id?: string | null
          verified_color?: string | null
        }
        Update: {
          accent_color?: string | null
          bg_color?: string | null
          border_color?: string | null
          content?: string | null
          created_at?: string
          event_type?: string | null
          id?: number
          integration_id?: number | null
          screen_alignment?: string | null
          show_products?: boolean
          text_color?: string | null
          title?: string | null
          user_id?: string | null
          verified_color?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Toasts_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "Integrations"
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
