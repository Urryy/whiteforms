using Common.Models.Form;
using System.ComponentModel.DataAnnotations;

namespace Common.Entities;

public class WhiteForm : Entity<WhiteForm>
{
    [Key]
    public override Guid Id { get; protected set; } = Guid.NewGuid();
    public string Name { get; set; }
    public Guid NameElementStyleId { get; set; }
    public Guid DescriptionElementStyleId { get; set; }
    public Guid ResourceId { get; set; }
    public string Description { get; set; }
    public string? NameClassNames { get; set; }
    public string? DescriptionClassNames { get; set; }
    public string? KolontitulImage { get; set; }
    public string PreviewImage { get; set; }
    public bool Accept { get; set; } = true;
    public ElementStyle NameElementStyle { get; set; }
    public ElementStyle DescriptionElementStyle { get; set; }
    public Resource Resource { get; set; }
    public ICollection<Question> Questions { get; set; }

    protected WhiteForm()
    { }

    public WhiteForm(string name, string description, string previewImage, Guid nameElementStyleId, Guid descriptionElementStyleId, Guid resourceId) : this()
    {
        Name = name;
        Description = description;
        PreviewImage = previewImage;
        NameElementStyleId = nameElementStyleId;
        DescriptionElementStyleId = descriptionElementStyleId;
        ResourceId = resourceId;
    }

    public override WhiteForm SetEntityId(Guid id)
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
