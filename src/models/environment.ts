class Environment {

  dbPlugin: DBPlugin;

  static mapping = (environmentJson: any) => {
    let environment: Environment = new Environment();
    environment.dbPlugin = new DBPlugin(environmentJson.dbPlugin);
    return environment;
  }
}
