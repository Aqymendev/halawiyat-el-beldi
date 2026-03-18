export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          available: boolean;
          category: string;
          created_at: string;
          description: string;
          featured: boolean;
          gallery_images: string[] | null;
          id: string;
          image_url: string;
          name: string;
          price_label: string | null;
          price_per_kg: number | null;
          short_description: string;
          slug: string;
          sort_order: number;
          updated_at: string;
          whatsapp_message: string | null;
        };
        Insert: {
          available?: boolean;
          category: string;
          created_at?: string;
          description: string;
          featured?: boolean;
          gallery_images?: string[] | null;
          id?: string;
          image_url: string;
          name: string;
          price_label?: string | null;
          price_per_kg?: number | null;
          short_description: string;
          slug: string;
          sort_order?: number;
          updated_at?: string;
          whatsapp_message?: string | null;
        };
        Update: {
          available?: boolean;
          category?: string;
          created_at?: string;
          description?: string;
          featured?: boolean;
          gallery_images?: string[] | null;
          id?: string;
          image_url?: string;
          name?: string;
          price_label?: string | null;
          price_per_kg?: number | null;
          short_description?: string;
          slug?: string;
          sort_order?: number;
          updated_at?: string;
          whatsapp_message?: string | null;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          brand_name: string;
          brand_subtitle: string;
          contact_headline: string;
          description: string;
          hero_accent: string;
          hero_description: string;
          hero_title: string;
          id: number;
          instagram_url: string;
          location_label: string;
          logo_url: string;
          updated_at: string;
          whatsapp_number: string;
        };
        Insert: {
          brand_name: string;
          brand_subtitle: string;
          contact_headline: string;
          description: string;
          hero_accent: string;
          hero_description: string;
          hero_title: string;
          id?: number;
          instagram_url: string;
          location_label: string;
          logo_url: string;
          updated_at?: string;
          whatsapp_number: string;
        };
        Update: {
          brand_name?: string;
          brand_subtitle?: string;
          contact_headline?: string;
          description?: string;
          hero_accent?: string;
          hero_description?: string;
          hero_title?: string;
          id?: number;
          instagram_url?: string;
          location_label?: string;
          logo_url?: string;
          updated_at?: string;
          whatsapp_number?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
