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
	public string Width { get; set; }
	public string Height { get; set; }
	public string Position { get; set; }

	protected ImageWrapper()
	{
			
	}

	public ImageWrapper(string width, string height, string position) : this()
	{
		Width = width;
		Height = height;
		Position = position;
	}

	public override ImageWrapper SetEntityId(Guid id)
	{
		this.Id = id;
		return this;
	}
}
