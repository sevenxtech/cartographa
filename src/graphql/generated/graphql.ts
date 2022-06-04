import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("https://unfoldingword-postgis.herokuapp.com/v1/graphql", {
    method: "POST",
    ...({"headers":{"x-hasura-admin-secret":"sevenx"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  geography: any;
  geometry: any;
  jsonb: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "Users" */
export type Users = {
  __typename?: 'Users';
  Id: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  role?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
};

/** aggregated selection of "Users" */
export type Users_Aggregate = {
  __typename?: 'Users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "Users" */
export type Users_Aggregate_Fields = {
  __typename?: 'Users_aggregate_fields';
  avg?: Maybe<Users_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
  stddev?: Maybe<Users_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Sum_Fields>;
  var_pop?: Maybe<Users_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Var_Samp_Fields>;
  variance?: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "Users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'Users_avg_fields';
  Id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "Users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  Id?: InputMaybe<Int_Comparison_Exp>;
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  firstName?: InputMaybe<String_Comparison_Exp>;
  lastName?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  userId?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "Users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'Users_pkey',
  /** unique or primary key constraint */
  UsersUserIdKey = 'Users_userId_key'
}

/** input type for incrementing numeric columns in table "Users" */
export type Users_Inc_Input = {
  Id?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "Users" */
export type Users_Insert_Input = {
  Id?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'Users_max_fields';
  Id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'Users_min_fields';
  Id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "Users" */
export type Users_Mutation_Response = {
  __typename?: 'Users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** on_conflict condition type for table "Users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "Users". */
export type Users_Order_By = {
  Id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  firstName?: InputMaybe<Order_By>;
  lastName?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Users */
export type Users_Pk_Columns_Input = {
  Id: Scalars['Int'];
};

/** select columns of table "Users" */
export enum Users_Select_Column {
  /** column name */
  Id = 'Id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  LastName = 'lastName',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "Users" */
export type Users_Set_Input = {
  Id?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'Users_stddev_fields';
  Id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'Users_stddev_pop_fields';
  Id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'Users_stddev_samp_fields';
  Id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'Users_sum_fields';
  Id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** update columns of table "Users" */
export enum Users_Update_Column {
  /** column name */
  Id = 'Id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  LastName = 'lastName',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId'
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'Users_var_pop_fields';
  Id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'Users_var_samp_fields';
  Id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'Users_variance_fields';
  Id?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['Float']>;
};

export type Geography_Cast_Exp = {
  geometry?: InputMaybe<Geometry_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "geography". All fields are combined with logical 'AND'. */
export type Geography_Comparison_Exp = {
  _cast?: InputMaybe<Geography_Cast_Exp>;
  _eq?: InputMaybe<Scalars['geography']>;
  _gt?: InputMaybe<Scalars['geography']>;
  _gte?: InputMaybe<Scalars['geography']>;
  _in?: InputMaybe<Array<Scalars['geography']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['geography']>;
  _lte?: InputMaybe<Scalars['geography']>;
  _neq?: InputMaybe<Scalars['geography']>;
  _nin?: InputMaybe<Array<Scalars['geography']>>;
  /** is the column within a given distance from the given geography value */
  _st_d_within?: InputMaybe<St_D_Within_Geography_Input>;
  /** does the column spatially intersect the given geography value */
  _st_intersects?: InputMaybe<Scalars['geography']>;
};

export type Geometry_Cast_Exp = {
  geography?: InputMaybe<Geography_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "geometry". All fields are combined with logical 'AND'. */
export type Geometry_Comparison_Exp = {
  _cast?: InputMaybe<Geometry_Cast_Exp>;
  _eq?: InputMaybe<Scalars['geometry']>;
  _gt?: InputMaybe<Scalars['geometry']>;
  _gte?: InputMaybe<Scalars['geometry']>;
  _in?: InputMaybe<Array<Scalars['geometry']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['geometry']>;
  _lte?: InputMaybe<Scalars['geometry']>;
  _neq?: InputMaybe<Scalars['geometry']>;
  _nin?: InputMaybe<Array<Scalars['geometry']>>;
  /** is the column within a given 3D distance from the given geometry value */
  _st_3d_d_within?: InputMaybe<St_D_Within_Input>;
  /** does the column spatially intersect the given geometry value in 3D */
  _st_3d_intersects?: InputMaybe<Scalars['geometry']>;
  /** does the column contain the given geometry value */
  _st_contains?: InputMaybe<Scalars['geometry']>;
  /** does the column cross the given geometry value */
  _st_crosses?: InputMaybe<Scalars['geometry']>;
  /** is the column within a given distance from the given geometry value */
  _st_d_within?: InputMaybe<St_D_Within_Input>;
  /** is the column equal to given geometry value (directionality is ignored) */
  _st_equals?: InputMaybe<Scalars['geometry']>;
  /** does the column spatially intersect the given geometry value */
  _st_intersects?: InputMaybe<Scalars['geometry']>;
  /** does the column 'spatially overlap' (intersect but not completely contain) the given geometry value */
  _st_overlaps?: InputMaybe<Scalars['geometry']>;
  /** does the column have atleast one point in common with the given geometry value */
  _st_touches?: InputMaybe<Scalars['geometry']>;
  /** is the column contained in the given geometry value */
  _st_within?: InputMaybe<Scalars['geometry']>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "Users" */
  delete_Users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "Users" */
  delete_Users_by_pk?: Maybe<Users>;
  /** delete data from the table: "postgis" */
  delete_postgis?: Maybe<Postgis_Mutation_Response>;
  /** delete single row from the table: "postgis" */
  delete_postgis_by_pk?: Maybe<Postgis>;
  /** insert data into the table: "Users" */
  insert_Users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "Users" */
  insert_Users_one?: Maybe<Users>;
  /** insert data into the table: "postgis" */
  insert_postgis?: Maybe<Postgis_Mutation_Response>;
  /** insert a single row into the table: "postgis" */
  insert_postgis_one?: Maybe<Postgis>;
  /** update data of the table: "Users" */
  update_Users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "Users" */
  update_Users_by_pk?: Maybe<Users>;
  /** update data of the table: "postgis" */
  update_postgis?: Maybe<Postgis_Mutation_Response>;
  /** update single row of the table: "postgis" */
  update_postgis_by_pk?: Maybe<Postgis>;
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  Id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_PostgisArgs = {
  where: Postgis_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Postgis_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PostgisArgs = {
  objects: Array<Postgis_Insert_Input>;
  on_conflict?: InputMaybe<Postgis_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Postgis_OneArgs = {
  object: Postgis_Insert_Input;
  on_conflict?: InputMaybe<Postgis_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PostgisArgs = {
  _append?: InputMaybe<Postgis_Append_Input>;
  _delete_at_path?: InputMaybe<Postgis_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Postgis_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Postgis_Delete_Key_Input>;
  _inc?: InputMaybe<Postgis_Inc_Input>;
  _prepend?: InputMaybe<Postgis_Prepend_Input>;
  _set?: InputMaybe<Postgis_Set_Input>;
  where: Postgis_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Postgis_By_PkArgs = {
  _append?: InputMaybe<Postgis_Append_Input>;
  _delete_at_path?: InputMaybe<Postgis_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Postgis_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Postgis_Delete_Key_Input>;
  _inc?: InputMaybe<Postgis_Inc_Input>;
  _prepend?: InputMaybe<Postgis_Prepend_Input>;
  _set?: InputMaybe<Postgis_Set_Input>;
  pk_columns: Postgis_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "postgis" */
export type Postgis = {
  __typename?: 'postgis';
  geometry: Scalars['geometry'];
  id: Scalars['Int'];
  name: Scalars['String'];
  properties: Scalars['jsonb'];
  type: Scalars['String'];
};


/** columns and relationships of "postgis" */
export type PostgisPropertiesArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "postgis" */
export type Postgis_Aggregate = {
  __typename?: 'postgis_aggregate';
  aggregate?: Maybe<Postgis_Aggregate_Fields>;
  nodes: Array<Postgis>;
};

/** aggregate fields of "postgis" */
export type Postgis_Aggregate_Fields = {
  __typename?: 'postgis_aggregate_fields';
  avg?: Maybe<Postgis_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Postgis_Max_Fields>;
  min?: Maybe<Postgis_Min_Fields>;
  stddev?: Maybe<Postgis_Stddev_Fields>;
  stddev_pop?: Maybe<Postgis_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Postgis_Stddev_Samp_Fields>;
  sum?: Maybe<Postgis_Sum_Fields>;
  var_pop?: Maybe<Postgis_Var_Pop_Fields>;
  var_samp?: Maybe<Postgis_Var_Samp_Fields>;
  variance?: Maybe<Postgis_Variance_Fields>;
};


/** aggregate fields of "postgis" */
export type Postgis_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Postgis_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Postgis_Append_Input = {
  properties?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Postgis_Avg_Fields = {
  __typename?: 'postgis_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "postgis". All fields are combined with a logical 'AND'. */
export type Postgis_Bool_Exp = {
  _and?: InputMaybe<Array<Postgis_Bool_Exp>>;
  _not?: InputMaybe<Postgis_Bool_Exp>;
  _or?: InputMaybe<Array<Postgis_Bool_Exp>>;
  geometry?: InputMaybe<Geometry_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  properties?: InputMaybe<Jsonb_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "postgis" */
export enum Postgis_Constraint {
  /** unique or primary key constraint */
  PostgisPkey = 'postgis_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Postgis_Delete_At_Path_Input = {
  properties?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Postgis_Delete_Elem_Input = {
  properties?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Postgis_Delete_Key_Input = {
  properties?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "postgis" */
export type Postgis_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "postgis" */
export type Postgis_Insert_Input = {
  geometry?: InputMaybe<Scalars['geometry']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Scalars['jsonb']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Postgis_Max_Fields = {
  __typename?: 'postgis_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Postgis_Min_Fields = {
  __typename?: 'postgis_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "postgis" */
export type Postgis_Mutation_Response = {
  __typename?: 'postgis_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Postgis>;
};

/** on_conflict condition type for table "postgis" */
export type Postgis_On_Conflict = {
  constraint: Postgis_Constraint;
  update_columns?: Array<Postgis_Update_Column>;
  where?: InputMaybe<Postgis_Bool_Exp>;
};

/** Ordering options when selecting data from "postgis". */
export type Postgis_Order_By = {
  geometry?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  properties?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: postgis */
export type Postgis_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Postgis_Prepend_Input = {
  properties?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "postgis" */
export enum Postgis_Select_Column {
  /** column name */
  Geometry = 'geometry',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Properties = 'properties',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "postgis" */
export type Postgis_Set_Input = {
  geometry?: InputMaybe<Scalars['geometry']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Scalars['jsonb']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Postgis_Stddev_Fields = {
  __typename?: 'postgis_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Postgis_Stddev_Pop_Fields = {
  __typename?: 'postgis_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Postgis_Stddev_Samp_Fields = {
  __typename?: 'postgis_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Postgis_Sum_Fields = {
  __typename?: 'postgis_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "postgis" */
export enum Postgis_Update_Column {
  /** column name */
  Geometry = 'geometry',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Properties = 'properties',
  /** column name */
  Type = 'type'
}

/** aggregate var_pop on columns */
export type Postgis_Var_Pop_Fields = {
  __typename?: 'postgis_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Postgis_Var_Samp_Fields = {
  __typename?: 'postgis_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Postgis_Variance_Fields = {
  __typename?: 'postgis_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Users" */
  Users: Array<Users>;
  /** fetch aggregated fields from the table: "Users" */
  Users_aggregate: Users_Aggregate;
  /** fetch data from the table: "Users" using primary key columns */
  Users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "postgis" */
  postgis: Array<Postgis>;
  /** fetch aggregated fields from the table: "postgis" */
  postgis_aggregate: Postgis_Aggregate;
  /** fetch data from the table: "postgis" using primary key columns */
  postgis_by_pk?: Maybe<Postgis>;
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  Id: Scalars['Int'];
};


export type Query_RootPostgisArgs = {
  distinct_on?: InputMaybe<Array<Postgis_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Postgis_Order_By>>;
  where?: InputMaybe<Postgis_Bool_Exp>;
};


export type Query_RootPostgis_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgis_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Postgis_Order_By>>;
  where?: InputMaybe<Postgis_Bool_Exp>;
};


export type Query_RootPostgis_By_PkArgs = {
  id: Scalars['Int'];
};

export type St_D_Within_Geography_Input = {
  distance: Scalars['Float'];
  from: Scalars['geography'];
  use_spheroid?: InputMaybe<Scalars['Boolean']>;
};

export type St_D_Within_Input = {
  distance: Scalars['Float'];
  from: Scalars['geometry'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Users" */
  Users: Array<Users>;
  /** fetch aggregated fields from the table: "Users" */
  Users_aggregate: Users_Aggregate;
  /** fetch data from the table: "Users" using primary key columns */
  Users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "postgis" */
  postgis: Array<Postgis>;
  /** fetch aggregated fields from the table: "postgis" */
  postgis_aggregate: Postgis_Aggregate;
  /** fetch data from the table: "postgis" using primary key columns */
  postgis_by_pk?: Maybe<Postgis>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  Id: Scalars['Int'];
};


export type Subscription_RootPostgisArgs = {
  distinct_on?: InputMaybe<Array<Postgis_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Postgis_Order_By>>;
  where?: InputMaybe<Postgis_Bool_Exp>;
};


export type Subscription_RootPostgis_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Postgis_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Postgis_Order_By>>;
  where?: InputMaybe<Postgis_Bool_Exp>;
};


export type Subscription_RootPostgis_By_PkArgs = {
  id: Scalars['Int'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'query_root', Users: Array<{ __typename?: 'Users', Id: number, firstName: string }> };

export type GetCoordinatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoordinatesQuery = { __typename?: 'query_root', postgis: Array<{ __typename?: 'postgis', geometry: any, id: number, name: string, properties: any, type: string }> };


export const GetUsersDocument = `
    query GetUsers {
  Users {
    Id
    firstName
  }
}
    `;
export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      variables?: GetUsersQueryVariables,
      options?: UseQueryOptions<GetUsersQuery, TError, TData>
    ) =>
    useQuery<GetUsersQuery, TError, TData>(
      variables === undefined ? ['GetUsers'] : ['GetUsers', variables],
      fetcher<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, variables),
      options
    );
export const GetCoordinatesDocument = `
    query getCoordinates {
  postgis {
    geometry
    id
    name
    properties
    type
  }
}
    `;
export const useGetCoordinatesQuery = <
      TData = GetCoordinatesQuery,
      TError = unknown
    >(
      variables?: GetCoordinatesQueryVariables,
      options?: UseQueryOptions<GetCoordinatesQuery, TError, TData>
    ) =>
    useQuery<GetCoordinatesQuery, TError, TData>(
      variables === undefined ? ['getCoordinates'] : ['getCoordinates', variables],
      fetcher<GetCoordinatesQuery, GetCoordinatesQueryVariables>(GetCoordinatesDocument, variables),
      options
    );