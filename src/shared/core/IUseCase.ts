interface IUseCase<IRequest, IResponse> {
  execute(requestProps?: IRequest): Promise<IResponse> | IResponse;
}
