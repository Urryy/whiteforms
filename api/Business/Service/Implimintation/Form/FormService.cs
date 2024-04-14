using AutoMapper;
using Business.Service.Interfaces.Form;
using Business.Service.Interfaces.Option;
using Business.Service.Interfaces.Question;
using Common.DataTranserObjects;
using Common.Entities;
using Common.Models.Form;
using Common.Models.Option;
using Common.Models.Question;
using DataAccess.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service.Implimintation.Form;

using Form = Common.Entities.Form;
using Option = Common.Entities.Option;
using Question = Common.Entities.Question;

public class FormService : GenericServiceAsync<Form>, IFormService
{
    private readonly IQuestionService _srvcQuestion;
    private readonly IOptionService _srvcOption;
    private readonly IMapper _mapper;

    public FormService(IUnitOfWork uoW, IQuestionService srvcQuestion, 
        IOptionService srvcOption, IMapper mapper) : base(uoW)
    {
        _srvcQuestion = srvcQuestion;
        _srvcOption = srvcOption;
        _mapper = mapper;
    }

    public async Task CreateForm(FormModel model)
    {
        var form = new Form(model.Name, model.Description);
        
        foreach (var question in model.Questions)
        {
            foreach(var option in question.Options)
            {
                await _srvcOption.AddAsync(_mapper.Map<OptionModel, Option>(option));
            }
            await _srvcQuestion.AddAsync(_mapper.Map<QuestionModel, Question>(question));
        }
        await AddAsync(form);
    }

    public async Task UpdateForm(FormUpdateModel model)
    {
        var form = _mapper.Map<FormUpdateModel, Form>(model);
        foreach (var question in form.Questions)
        {
            foreach (var option in question.Options)
            {
                await _srvcOption.UpdateAsync(option);
            }
            await _srvcQuestion.UpdateAsync(question);
        }
        await UpdateAsync(form);
    }
}
