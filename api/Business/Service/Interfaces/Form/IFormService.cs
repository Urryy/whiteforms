namespace Business.Service.Interfaces.Form;

using Common.Models.Form;
using Form = Common.Entities.Form;
public interface IFormService : IGenericServiceAsync<Form>
{
    Task<Guid> CreateForm(FormModel model);
    Task<Guid> UpdateForm(FormUpdateModel model);
}
