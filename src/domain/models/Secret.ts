export class Secret {
  constructor(private secret: string) {
    if (secret.length < 3) throw new Error("Secret is too short");
  }

  public get getSecret(): string {
    return this.secret;
  }
}
