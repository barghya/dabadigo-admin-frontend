import { ErrorModel } from './errorModel';

export interface ParameterManagementMain {
    loading?: boolean;
    error?: ErrorModel;
    ParameterList?: Parameter[];
    SingleParameter?: Parameter;
}

export  interface Parameter {
    admn_parameters_id?: number;
    parameter_key?: string;
    parameter_value?: string;
    parameter_desc?: string;
  }

  export  interface EditParameter {
    admn_parameters_id?: number;
  }