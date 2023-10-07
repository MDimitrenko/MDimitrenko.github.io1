export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
};

type Cost = {
  id: string;
  name: string;
  desc?: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  category: Category;
  type: 'Cost';
};

type Profit = {
  id: string;
  name: string;
  desc?: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  category: Category;
  type: 'Profit';
};

export type Operation = Profit | Cost;

export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
};

export type UpdateProfileBody = {
  name: string;
};

export type ChangePasswordBody = {
  password: string;
  newPassword: string;
};

export type ChangePasswordResult = {
  success: boolean;
};

export type SignUpBody = {
  email: string;
  password: string;
  commandId: string;
};

export type AuthResult = {
  token: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type ServerErrors = {
  errors: {
    extensions: {
      code: ErrorCode;
    };

    name: string;
    stack: string;
    message: string;
  }[];
};

enum ErrorCode {
  ERR_INCORRECT_EMAIL_OR_PASSWORD = 'ERR_INCORRECT_EMAIL_OR_PASSWORD',
  ERR_NOT_FOUND = 'ERR_NOT_FOUND',
  ERR_FIELD_REQUIRED = 'ERR_FIELD_REQUIRED',
  ERR_INCORRECT_PASSWORD = 'ERR_INCORRECT_PASSWORD',
  ERR_ACCOUNT_ALREADY_EXIST = 'ERR_ACCOUNT_ALREADY_EXIST',
  ERR_INVALID_PASSWORD = 'ERR_INVALID_PASSWORD',
  ERR_AUTH = 'ERR_AUTH',
  ERR_NO_FILES = 'ERR_NO_FILES',
  ERR_NOT_ALLOWED = 'ERR_NOT_ALLOWED',
  ERR_DATA_BASE_ERROR = 'ERR_DATA_BASE_ERROR',
  ERR_VALIDATION_ERROR = 'ERR_VALIDATION_ERROR',
}

export type Pagination = {
  pageSize?: number;
  pageNumber?: number;
};

export type Sorting = {
  type: 'ASC' | 'DESC';
  field: 'id' | 'createdAt' | 'updatedAt' | 'name';
};

export type Filters = {
  ids?: string[];
  name?: string;
  type?: 'Cost' | 'Profit';
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  date?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  createdAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  updatedAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  };
  sorting?: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  };
};

export type NewOperation = {
  id?: string;
  name: string;
  desc?: string;
  date: string;
  amount: number;
  type: 'Profit' | 'Cost';
  categoryId: string;
};

export type NewCategory = {
  id?: string;
  categoryName: string;
  file?: File;
  url?: string;
};

export type OperationList = {
  data: Operation[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  };
};

export type CategoryList = {
  data: Category[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  }
}

export type UploadFile = {
  url: string;
}
