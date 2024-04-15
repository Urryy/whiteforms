using System.ComponentModel.DataAnnotations;

namespace Common.Entities;

public class Form : Entity<Form>
{
    [Key]
    public Guid Id { get; protected set; } = Guid.NewGuid();
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<Question> Questions { get; set; }

    protected Form()
    { }

    public Form(string name, string description) : this()
    {
        Name = name;
        Description = description;
    }

    public override Form SetEntityId(Guid id)
    {
        this.Id = id;
        return this;
    }
}
