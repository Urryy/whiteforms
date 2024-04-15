using AutoMapper;
using Common.DataTranserObjects.Form;
using Common.DataTranserObjects.Option;
using Common.DataTranserObjects.Question;
using Common.Entities;
using Common.Enums;
using Common.Models.Form;
using Common.Models.Option;
using Common.Models.Question;
using DataAccess.Extension;

namespace DataAccess.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        #region Form
        CreateMap<Form, FormDto>().ReverseMap();
        CreateMap<Form, FormModel>().ReverseMap();
        #endregion

        #region Question
        CreateMap<Question, QuestionDto>()
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()));
        CreateMap<QuestionDto, Question>()
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToEnum<QuestionType>()));

        CreateMap<Question, QuestionModel>()
            .ForMember(dest => dest.QuestionType, opt => opt.MapFrom(src => src.Type.ToString()));
        CreateMap<QuestionModel, Question>()
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.QuestionType.ToEnum<QuestionType>()));
        #endregion

        #region Option
        CreateMap<Option, OptionDto>().ReverseMap();
        CreateMap<Option, OptionModel>().ReverseMap();
        #endregion
    }
}
