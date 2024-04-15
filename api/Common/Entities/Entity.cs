namespace Common.Entities;

public abstract class Entity<T>
    where T : class
{
    public abstract T SetEntityId(Guid id);
}
