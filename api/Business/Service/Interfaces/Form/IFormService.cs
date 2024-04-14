namespace Business.Service.Interfaces.Form;

using Common.Models.Form;
using Form = Common.Entities.Form;
public interface IFormService : IGenericServiceAsync<Form>
{
    Task CreateForm(FormModel model);
    Task UpdateForm(FormUpdateModel model);
}
