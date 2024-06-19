using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class ImageWrapper : Entity<ImageWrapper>
{
	[Key]
	public override Guid Id { get; protected set; } = Guid.NewGuid();
	public Guid OptionId { get; set; }
	public string Width { get; set; }
	public string Height { get; set; }
	public string Position { get; set; }
	public Option Option { get; set; }

	protected ImageWrapper()
	{
			
	}

	public ImageWrapper(string width, string height, string position, Guid optionid) : this()
	{
		Width = width;
		Height = height;
		Position = position;
		OptionId = optionid;
	}

	public override ImageWrapper SetEntityId(Guid id)
	{
		this.Id = id;
		return this;
	}
}
