using Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class ElementStyle : Entity<ElementStyle>
{
	[Key]
	public override Guid Id { get; protected set; } = Guid.NewGuid();
	public string FontSize { get; set; }
	public string FontFamily { get; set; }
	public ElementType Type { get; set; }

	protected ElementStyle()
	{
			
	}

	public ElementStyle(string fontSize, string fontFamily, ElementType type) : this()
	{
		FontSize = fontSize;
		FontFamily = fontFamily;
		Type = type;
	}

	public override ElementStyle SetEntityId(Guid id)
	{
		this.Id = id;
		return this;
	}
}
