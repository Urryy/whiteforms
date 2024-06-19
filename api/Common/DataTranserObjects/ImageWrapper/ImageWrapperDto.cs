using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTranserObjects.ImageWrapper;

using ImageWrapper = Entities.ImageWrapper;

public class ImageWrapperDto
{
	public string Width { get; set; } = default!;
	public string Height { get; set; } = default!;
	public string Position { get; set; } = default!;

	public static ImageWrapperDto EntityToDto(ImageWrapper entity)
	{
		var dto = new ImageWrapperDto
		{
			Width = entity.Width,
			Height = entity.Height,
			Position = entity.Position,
		};
		return dto;
	}
}
