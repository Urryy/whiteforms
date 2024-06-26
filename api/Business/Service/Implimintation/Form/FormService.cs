using AutoMapper;
using Business.Service.Interfaces.ElementStyle;
using Business.Service.Interfaces.Form;
using Business.Service.Interfaces.ImageWrapper;
using Business.Service.Interfaces.Option;
using Business.Service.Interfaces.Question;
using Business.Utils.Interfaces;
using Common.DataTranserObjects.Form;
using Common.Enums;
using Common.Models.Form;
using DataAccess.Extension;
using DataAccess.Fetch.Interface;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Service.Implimintation.Form;

using WhiteForm = Common.Entities.WhiteForm;
using ElementStyle = Common.Entities.ElementStyle;

public class FormService : GenericServiceAsync<WhiteForm>, IFormService
{
    private readonly IQuestionService _srvcQuestion;
    private readonly IOptionService _srvcOption;
    private readonly IElementStyleService _srvcElementStyle;
    private readonly IImageWrapperService _srvcImageWrapper;
    private readonly IMapper _mapper;

    public FormService(IUnitOfWork uoW, 
                       IQuestionService srvcQuestion,
                       IOptionService srvcOption, 
                       IMapper mapper,
                       IServiceProvider srvcProvider, 
                       IElementStyleService srvcElementStyle,
                       IImageWrapperService srvcImageWrapper,
		               IUserUtil userUtil, 
                       IHttpContextAccessor context, 
                       IServiceScopeFactory scopeFactory) : base(uoW, srvcProvider, userUtil, context, scopeFactory)
	{
        _srvcQuestion = srvcQuestion;
        _srvcOption = srvcOption;
        _mapper = mapper;
        _srvcElementStyle = srvcElementStyle;
        _srvcImageWrapper = srvcImageWrapper;
    }

    public async Task<Guid> CreateForm(FormModel model)
    {
		var elementStyleName = new ElementStyle(model.NameElementStyle.FontSize, model.NameElementStyle.FontFamily, ElementType.Kolontitul);
		var elementStyleDesc = new ElementStyle(model.DescriptionElementStyle.FontSize, model.DescriptionElementStyle.FontFamily, ElementType.Description);

		await _srvcElementStyle.AddAsync(elementStyleName);
		await _srvcElementStyle.AddAsync(elementStyleDesc);

        var resource = UserUtil.GetCurrentUser(Context.HttpContext).GetAuthorizedResource();
		var form = new WhiteForm(model.Name, model.Description, model.PreviewImage, elementStyleName.Id, elementStyleDesc.Id, resource.Id);

        if (model.PreviewImage != null) 
            form.KolontitulImage = model.KolontitulImage;
		
		if(model.NameClassNames != null)
            form.NameClassNames = string.Join(" ", model.NameClassNames);
        
        if (model.DescriptionClassNames != null) 
            form.DescriptionClassNames = string.Join(" ", model.DescriptionClassNames);
        

		await AddAsync(form);

		await _srvcQuestion.AddQuestionsFromForm(model.Questions, form.Id);

        //Индексирование
        await EstablishIndexEntity(form.Id, DatabaseOperationType.Insert, true);
		return form.Id;
    }

    public async Task<Guid> UpdateForm(FormUpdateModel model)
    {
        var form = await GetByIdAsync(model.Id, GetFetch<IFetchForm>());
        if (form == null)
            throw new NullReferenceException("form doesn't exist");
        form.UpdateEntity(model);
		await UpdateAsync(form);

		//Удаление старых вопросов и вариантов внутри их, при удалении вопросов, удаляется так же вариант, так что нужно лишь удалять вопросы.
		foreach (var oldQuestion in form.Questions)
		{
			foreach (var oldOption in oldQuestion.Options)
			{
				await _srvcOption.DeleteAsync(oldOption.Id);
			}
			await _srvcQuestion.DeleteAsync(oldQuestion.Id);
		}

		await _srvcQuestion.AddQuestionsFromForm(model.Questions, form.Id);

		//Индексирование
		await EstablishIndexEntity(form.Id, DatabaseOperationType.Update, true);

		return form.Id;
	}

    public async Task<List<WhiteForm>> GetForms()
    {
		var resource = UserUtil.GetCurrentUser(Context.HttpContext).GetAuthorizedResource();
        var forms = await GetAllAsync(GetFetch<IFetchForm>());
        var formsByResourceId = forms.Where(f => f.ResourceId == resource.Id).ToList();
        return formsByResourceId;
	}

    public async Task<FormDto> GetForm(Guid objectId)
    {
		var resource = UserUtil.GetCurrentUser(Context.HttpContext).GetAuthorizedResource();

		var form = await GetByIdAsync(objectId, GetFetch<IFetchForm>());
		if (form == null || form.ResourceId != resource.Id)
		{
			throw new ArgumentException("Данной формы не существует");
		}
		var dto = FormDto.EntityToDto(form);
        return dto;
	}

    public async Task UpdateState(Guid objectId, bool state)
    {
        var form = await GetByIdAsync(objectId);
        if (form == null) throw new NullReferenceException("Form not exist");
		form.Accept = state;

		await UpdateAsync(form);
        await EstablishIndexEntity(form.Id, DatabaseOperationType.Update, true);
    }
}
