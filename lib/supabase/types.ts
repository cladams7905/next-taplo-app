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
      Events: {
        Row: {
          created_at: string
          custom_messages: Json | null
          event_type: string
          header: string | null
          id: number
          integration_id: number | null
          message: string
          project_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_messages?: Json | null
          event_type?: string
          header?: string | null
          id?: number
          integration_id?: number | null
          message?: string
          project_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          custom_messages?: Json | null
          event_type?: string
          header?: string | null
          id?: number
          integration_id?: number | null
          message?: string
          project_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Events_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "Integrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Integrations: {
        Row: {
          api_key: string | null
          created_at: string
          google_client_email: string | null
          google_private_key: string | null
          google_project_id: string | null
          google_property_id: string | null
          id: number
          name: string | null
          project_id: number
          provider: string | null
          user_id: string
        }
        Insert: {
          api_key?: string | null
          created_at?: string
          google_client_email?: string | null
          google_private_key?: string | null
          google_project_id?: string | null
          google_property_id?: string | null
          id?: number
          name?: string | null
          project_id: number
          provider?: string | null
          user_id: string
        }
        Update: {
          api_key?: string | null
          created_at?: string
          google_client_email?: string | null
          google_private_key?: string | null
          google_project_id?: string | null
          google_property_id?: string | null
          id?: number
          name?: string | null
          project_id?: number
          provider?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Integrations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Products: {
        Row: {
          created_at: string
          currency: string | null
          id: number
          image_url: string | null
          link: string | null
          name: string | null
          price: number | null
          project_id: number
          stripe_product_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string | null
          id?: number
          image_url?: string | null
          link?: string | null
          name?: string | null
          price?: number | null
          project_id: number
          stripe_product_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string | null
          id?: number
          image_url?: string | null
          link?: string | null
          name?: string | null
          price?: number | null
          project_id?: number
          stripe_product_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Products_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Projects: {
        Row: {
          accent_color: string | null
          bg_color: string | null
          border_color: string | null
          created_at: string
          display_time: number | null
          event_interval: number
          id: number
          is_active: boolean
          name: string
          public_url: string | null
          screen_alignment: string | null
          template: string | null
          text_color: string | null
          user_id: string
        }
        Insert: {
          accent_color?: string | null
          bg_color?: string | null
          border_color?: string | null
          created_at?: string
          display_time?: number | null
          event_interval?: number
          id?: number
          is_active?: boolean
          name?: string
          public_url?: string | null
          screen_alignment?: string | null
          template?: string | null
          text_color?: string | null
          user_id?: string
        }
        Update: {
          accent_color?: string | null
          bg_color?: string | null
          border_color?: string | null
          created_at?: string
          display_time?: number | null
          event_interval?: number
          id?: number
          is_active?: boolean
          name?: string
          public_url?: string | null
          screen_alignment?: string | null
          template?: string | null
          text_color?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
