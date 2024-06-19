using Common.Models.Form;
using System.ComponentModel.DataAnnotations;

namespace Common.Entities;

public class Form : Entity<Form>
{
    [Key]
    public override Guid Id { get; protected set; } = Guid.NewGuid();
    public string Name { get; set; }
    public Guid NameElementStyleId { get; set; }
    public Guid DescriptionElementStyleId { get; set; }
    public string Description { get; set; }
    public string? NameClassNames { get; set; }
    public string? DescriptionClassNames { get; set; }
    public string? KolontitulImage { get; set; }
    public string PreviewImage { get; set; }
    public ElementStyle NameElementStyle { get; set; }
    public ElementStyle DescriptionElementStyle { get; set; }
    public ICollection<Question> Questions { get; set; }

    protected Form()
    { }

    public Form(string name, string description, string previewImage, Guid nameElementStyleId, Guid descriptionElementStyleId) : this()
    {
        Name = name;
        Description = description;
        PreviewImage = previewImage;
        NameElementStyleId = nameElementStyleId;
        DescriptionElementStyleId = descriptionElementStyleId;
    }

    public override Form SetEntityId(Guid id)
    {
        this.Id = id;
        return this;
    }

    public void UpdateEntity(FormUpdateModel model)
    {
		this.Name = model.Name;
		this.Description = model.Description;
		this.NameClassNames = model.NameClassNames != null ? string.Join(" ", model.NameClassNames) : string.Empty;
		this.DescriptionClassNames = model.DescriptionClassNames != null ? string.Join(" ", model.DescriptionClassNames) : string.Empty;
		this.KolontitulImage = model.KolontitulImage;
		this.PreviewImage = model.PreviewImage;
		this.NameElementStyle.FontSize = model.NameElementStyle.FontSize;
		this.NameElementStyle.FontFamily = model.NameElementStyle.FontFamily;
		this.DescriptionElementStyle.FontSize = model.DescriptionElementStyle.FontSize;
		this.DescriptionElementStyle.FontFamily = model.DescriptionElementStyle.FontFamily;
    }
}
