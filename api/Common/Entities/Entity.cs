namespace Common.Entities;

public abstract class Entity<T>
    where T : class
{
    public virtual Guid Id { get; protected set; }
    public abstract T SetEntityId(Guid id);
}
