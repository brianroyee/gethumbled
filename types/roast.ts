export interface RoastResponse {
    score: number;
    headline_roast: string;
    summary_roast: string;
    buzzword_count: number;
    red_flags: string[];
    career_advice: string;
}

export interface RoastError {
    error: string;
    message: string;
}
