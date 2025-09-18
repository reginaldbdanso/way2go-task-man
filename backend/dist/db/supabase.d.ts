export declare const supabase: import("@supabase/supabase-js").SupabaseClient<any, "public", "public", any, any>;
export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    created_at: string;
    updated_at: string;
    user_id?: string;
}
export interface Milestone {
    id: string;
    task_id: string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    order_index: number;
    created_at: string;
    updated_at: string;
}
export interface CreateTaskRequest {
    title: string;
    description: string;
    priority?: 'low' | 'medium' | 'high';
}
export interface CreateMilestoneRequest {
    task_id: string;
    title: string;
    description: string;
    order_index: number;
}
//# sourceMappingURL=supabase.d.ts.map