/**
 * Query builder utility for constructing filter, pagination, and sorting parameters
 */

export type FilterOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'contains'
  | 'notContains'
  | 'beginsWith'
  | 'endsWith'
  | 'exists';

export interface FilterOptions {
  operator?: FilterOperator;
  value: string | number | boolean | string[];
}

export interface QueryParams {
  [key: string]: string | number | undefined;
}

export class QueryBuilder {
  private params: QueryParams = {};
  private filters: Map<string, FilterOptions> = new Map();
  private sortField?: string;
  private sortOrder: 'asc' | 'desc' = 'asc';

  /**
   * Add a filter condition
   * @param field - Field name to filter on
   * @param operator - Filter operator (default: 'eq')
   * @param value - Filter value
   */
  filter(
    field: string,
    operatorOrValue: FilterOperator | string | number | boolean,
    value?: string | number | boolean | string[]
  ): this {
    let operator: FilterOperator;
    let filterValue: string | number | boolean | string[];

    if (value === undefined) {
      // If only two arguments, treat first as operator/value
      if (typeof operatorOrValue === 'string' && this.isOperator(operatorOrValue)) {
        throw new Error('Filter operator requires a value');
      }
      operator = 'eq';
      filterValue = operatorOrValue as string | number | boolean;
    } else {
      operator = operatorOrValue as FilterOperator;
      filterValue = value;
    }

    this.filters.set(field, { operator, value: filterValue });
    return this;
  }

  /**
   * Add an equality filter (shorthand)
   */
  eq(field: string, value: string | number | boolean): this {
    return this.filter(field, 'eq', value);
  }

  /**
   * Add a "not equal" filter (shorthand)
   */
  ne(field: string, value: string | number | boolean): this {
    return this.filter(field, 'ne', value);
  }

  /**
   * Add a "greater than" filter (shorthand)
   */
  gt(field: string, value: string | number): this {
    return this.filter(field, 'gt', value);
  }

  /**
   * Add a "greater than or equal" filter (shorthand)
   */
  gte(field: string, value: string | number): this {
    return this.filter(field, 'gte', value);
  }

  /**
   * Add a "less than" filter (shorthand)
   */
  lt(field: string, value: string | number): this {
    return this.filter(field, 'lt', value);
  }

  /**
   * Add a "less than or equal" filter (shorthand)
   */
  lte(field: string, value: string | number): this {
    return this.filter(field, 'lte', value);
  }

  /**
   * Add an "in" filter (shorthand)
   */
  in(field: string, values: string[]): this {
    return this.filter(field, 'in', values);
  }

  /**
   * Add a "contains" filter (shorthand)
   */
  contains(field: string, value: string): this {
    return this.filter(field, 'contains', value);
  }

  /**
   * Set sort field and order
   * @param field - Field to sort by
   * @param order - Sort order ('asc' or 'desc', default: 'asc')
   */
  sort(field: string, order: 'asc' | 'desc' = 'asc'): this {
    this.sortField = field;
    this.sortOrder = order;
    return this;
  }

  /**
   * Sort in descending order (shorthand)
   */
  sortDesc(field: string): this {
    return this.sort(field, 'desc');
  }

  /**
   * Set page number
   */
  page(page: number | string): this {
    this.params.page = typeof page === 'string' ? page : page.toString();
    return this;
  }

  /**
   * Set page size
   */
  size(size: number): this {
    if (size < 1) {
      throw new Error('Page size must be at least 1');
    }
    if (size > 100) {
      throw new Error('Page size cannot exceed 100');
    }
    this.params.size = size;
    return this;
  }

  /**
   * Add a custom parameter
   */
  param(key: string, value: string | number): this {
    this.params[key] = value;
    return this;
  }

  /**
   * Build the query parameters object
   */
  build(): QueryParams {
    const result: QueryParams = { ...this.params };

    // Add filters
    for (const [field, { operator, value }] of this.filters.entries()) {
      if (operator === 'eq') {
        // Simple equality filters don't need operator notation
        result[field] = String(value);
      } else if (operator === 'exists') {
        // Exists operator uses special syntax
        result[`${field}[exists]`] = String(value);
      } else {
        // Other operators use bracket notation
        result[`${field}[${operator}]`] = Array.isArray(value)
          ? value.join(',')
          : String(value);
      }
    }

    // Add sort
    if (this.sortField) {
      result.sort =
        this.sortOrder === 'desc' ? `-${this.sortField}` : this.sortField;
    }

    return result;
  }

  /**
   * Build query string
   */
  buildQueryString(): string {
    const params = this.build();
    const pairs = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    return pairs.length > 0 ? `?${pairs.join('&')}` : '';
  }

  /**
   * Reset the builder
   */
  reset(): this {
    this.params = {};
    this.filters.clear();
    this.sortField = undefined;
    this.sortOrder = 'asc';
    return this;
  }

  private isOperator(value: string): boolean {
    return [
      'eq',
      'ne',
      'gt',
      'gte',
      'lt',
      'lte',
      'in',
      'contains',
      'notContains',
      'beginsWith',
      'endsWith',
      'exists',
    ].includes(value);
  }
}

