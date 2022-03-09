/**
 * A basic API response interface
 * @class
 */
export class ApiResponse<T> {
  public constructor(
    /** Explanation text to include in the response */
    public message: string,

    /** The data to return to the client */
    public data: T,

    /** Whether or not the request was successful */
    public success: boolean = true,
  ) {}
}
