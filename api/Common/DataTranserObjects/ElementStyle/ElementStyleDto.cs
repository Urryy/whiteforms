using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataTranserObjects.ElementStyle;

using ElementStyle = Entities.ElementStyle;

public class ElementStyleDto
{
	public string FontSize { get; set; } = default!;
	public string FontFamily { get; set; } = default!;
	public static ElementStyleDto EntityToDto(ElementStyle entity)
	{
		var dto = new ElementStyleDto
		{
			FontSize = entity.FontSize,
			FontFamily = entity.FontFamily,
		};
		return dto;
	}
}
