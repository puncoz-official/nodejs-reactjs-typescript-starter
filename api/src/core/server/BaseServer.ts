abstract class BaseServer<T> {
    public server: T

    protected constructor(readonly options: ServerOptions) {
        this.options = options
    }

    public abstract async boot(callback: (option: ServerOptions, server: T) => void): Promise<T>
}

export default BaseServer
