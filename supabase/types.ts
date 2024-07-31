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
          content_body: string | null
          created_at: string
          event_type: string
          id: number
          integration_id: number | null
          project_id: number
          show_add_to_cart: boolean | null
          show_positive_reviews: boolean | null
          show_price: boolean | null
          show_products: boolean | null
          show_recently_active_users: boolean | null
          show_viewed_products: boolean | null
          user_id: string
        }
        Insert: {
          content_body?: string | null
          created_at?: string
          event_type?: string
          id?: number
          integration_id?: number | null
          project_id: number
          show_add_to_cart?: boolean | null
          show_positive_reviews?: boolean | null
          show_price?: boolean | null
          show_products?: boolean | null
          show_recently_active_users?: boolean | null
          show_viewed_products?: boolean | null
          user_id: string
        }
        Update: {
          content_body?: string | null
          created_at?: string
          event_type?: string
          id?: number
          integration_id?: number | null
          project_id?: number
          show_add_to_cart?: boolean | null
          show_positive_reviews?: boolean | null
          show_price?: boolean | null
          show_products?: boolean | null
          show_recently_active_users?: boolean | null
          show_viewed_products?: boolean | null
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
          {
            foreignKeyName: "Events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Integrations: {
        Row: {
          api_key: string | null
          created_at: string
          id: number
          name: string | null
          project_id: number
          provider: string | null
          user_id: string
        }
        Insert: {
          api_key?: string | null
          created_at?: string
          id?: number
          name?: string | null
          project_id: number
          provider?: string | null
          user_id: string
        }
        Update: {
          api_key?: string | null
          created_at?: string
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
          event_id: number
          id: number
          image_url: string | null
          link: string | null
          name: string | null
          price: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string | null
          event_id: number
          id?: number
          image_url?: string | null
          link?: string | null
          name?: string | null
          price?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string | null
          event_id?: number
          id?: number
          image_url?: string | null
          link?: string | null
          name?: string | null
          price?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Products_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "Events"
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
      Projects: {
        Row: {
          accent_color: string | null
          bg_color: string | null
          border_color: string | null
          created_at: string
          event_interval: number
          id: number
          is_active: boolean
          name: string
          screen_alignment: string | null
          template: string | null
          text_color: string | null
          user_id: string
          verified_color: string | null
        }
        Insert: {
          accent_color?: string | null
          bg_color?: string | null
          border_color?: string | null
          created_at?: string
          event_interval?: number
          id?: number
          is_active?: boolean
          name?: string
          screen_alignment?: string | null
          template?: string | null
          text_color?: string | null
          user_id?: string
          verified_color?: string | null
        }
        Update: {
          accent_color?: string | null
          bg_color?: string | null
          border_color?: string | null
          created_at?: string
          event_interval?: number
          id?: number
          is_active?: boolean
          name?: string
          screen_alignment?: string | null
          template?: string | null
          text_color?: string | null
          user_id?: string
          verified_color?: string | null
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
