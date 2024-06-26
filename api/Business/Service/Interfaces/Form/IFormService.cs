namespace Business.Service.Interfaces.Form;

using Common.DataTranserObjects.Form;
using Common.Models.Form;
using WhiteForm = Common.Entities.WhiteForm;
public interface IFormService : IGenericServiceAsync<WhiteForm>
{
    Task<Guid> CreateForm(FormModel model);
    Task<Guid> UpdateForm(FormUpdateModel model);
    Task<List<WhiteForm>> GetForms();
    Task<FormDto> GetForm(Guid objectId);
    Task UpdateState(Guid objectId, bool state);
}
