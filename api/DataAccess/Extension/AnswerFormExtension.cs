using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Extension;

public static class AnswerFormExtension
{
	public static string GetAnswerString(int count)
	{
		string[] endings = new[] { "ответ", "ответа", "ответов" };
		int mod100 = count % 100;
		int mod10 = count % 10;

		int index = 2;
		if (mod100 >= 11 && mod100 <= 19)
		{
			index = 2;
		}
		else if (mod10 == 1)
		{
			index = 0;
		}
		else if (mod10 >= 2 && mod10 <= 4)
		{
			index = 1;
		}

		return $"{count.ToString("N0")} {endings[index]}";
	}
}
