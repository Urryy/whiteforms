using Common.Entities;
using DataAccess.Fetch.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Fetch.Implemintation;

public class FetchAnswerForm : IFetchAnswerForm
{
	public IQueryable<AnswerForm> AcceptQuery(IQueryable<AnswerForm> query)
	{
		return query.Include(f => f.Form)
					.Include(f => f.AnswerQuestions)
					.ThenInclude(q => q.AnswerOptions)
					.ThenInclude(o => o.Option)
					.Include(f => f.AnswerQuestions)
					.ThenInclude(q => q.Question);
	}
}
