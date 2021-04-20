import { ErrorModel } from './errorModel';

export interface ProblemInventorytaggingMain {
    error?: ErrorModel;
    loading?: boolean;
    problemtaggedDetails?: ProblemTaggedDetails;
    problemDetails?: ProblemDetails[];
    parts?: AllPartsDetails[];
}

export interface ProblemTaggedDetails {
    problem_codes_id?: number;
    problem_code?: number;
    display_desc?: string;
    severity?: number;
    map_to_image?: number;
    inventory_mapped?: number;
    severity_name?: string;
    parts_details?: PartsDetails[];
}

export interface PartsDetails {
    problem_code_association_id?: number;
    problem_code?: number;
    parts_master_id?: number;
    part_name?: string;
}

export interface ProblemDetails {
    problem_codes_id?: number;
    problem_code?: number;
    display_desc?: string;
    severity?: number;
    map_to_image?: number;
    inventory_mapped?: number;
    severity_name?: string;
}

export interface GetProblemByCodeService {
    problem_code?: number;
}

export interface AllPartsDetails {
    part_manufacturer?: string;
    part_name?: string;
    part_price?: number;
    part_short_code?: string;
    part_source_country?: string;
    part_source_country_name?: string;
    part_tag?: string;
    parts_master_id?: number;
    problem_code?: number;
}