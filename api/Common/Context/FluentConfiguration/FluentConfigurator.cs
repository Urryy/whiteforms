using Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Common.Context.FluentConfiguration;

public class FluentConfigurator
{
    public class Form_Configuration : IEntityTypeConfiguration<Form>
    {
        public void Configure(EntityTypeBuilder<Form> builder)
        {
            builder.HasMany<Question>(f => f.Questions)
                   .WithOne(q => q.Form)
                   .HasForeignKey(q => q.FormId)
                   .HasPrincipalKey(q => q.Id)
                   .OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(f => f.NameElementStyle)
                   .WithOne()
                   .HasForeignKey<Form>(i => i.NameElementStyleId)
                   .OnDelete(DeleteBehavior.ClientCascade);

			builder.HasOne(f => f.DescriptionElementStyle)
				   .WithOne()
				   .HasForeignKey<Form>(i => i.DescriptionElementStyleId)
				   .OnDelete(DeleteBehavior.ClientCascade);
		}
    }

    public class Question_Configuration : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.HasMany<Option>(q => q.Options)
                   .WithOne(opt => opt.Question)
                   .HasForeignKey(opt => opt.QuestionId)
                   .HasPrincipalKey(q => q.Id)
                   .OnDelete(DeleteBehavior.Cascade);

			builder.HasOne(f => f.QuestionElementStyle)
	               .WithOne()
	               .HasForeignKey<Question>(i => i.QuestionElementStyleId)
	               .OnDelete(deleteBehavior: DeleteBehavior.ClientCascade);
		}
    }

    public class Option_Configuration : IEntityTypeConfiguration<Option>
    {
        public void Configure(EntityTypeBuilder<Option> builder)
        {
            builder.HasOne(f => f.OptionElementStyle)
                   .WithOne()
                   .HasForeignKey<Option>(i => i.OptionElementStyleId)
                   .OnDelete(deleteBehavior: DeleteBehavior.ClientCascade);
		}
    }

	public class ImageWrapper_Configuration : IEntityTypeConfiguration<ImageWrapper>
	{
		public void Configure(EntityTypeBuilder<ImageWrapper> builder)
		{
            builder.HasOne(f => f.Option)
                   .WithOne(o => o.ImageWrapper)
                   .HasForeignKey<ImageWrapper>(i => i.OptionId)
                   .OnDelete(deleteBehavior: DeleteBehavior.ClientCascade);
		}
	}

    public class AnswerForm_Configuration : IEntityTypeConfiguration<AnswerForm>
    {
        public void Configure(EntityTypeBuilder<AnswerForm> builder)
        {
            builder.HasOne(a => a.Form)
                   .WithMany()
                   .HasForeignKey(a => a.FormId);

			builder.HasMany<AnswerQuestion>(f => f.AnswerQuestions)
	               .WithOne(q => q.AnswerForm)
	               .HasForeignKey(q => q.AnswerFormId)
	               .HasPrincipalKey(q => q.Id)
	               .OnDelete(DeleteBehavior.Cascade);
		}
    }

    public class AnswerQuestion_Configuration : IEntityTypeConfiguration<AnswerQuestion>
    {
        public void Configure(EntityTypeBuilder<AnswerQuestion> builder)
        {
            builder.HasOne(a => a.AnswerForm)
                   .WithMany()
                   .HasForeignKey(a => a.AnswerFormId);

            builder.HasOne(a => a.Question)
                   .WithOne()
                   .HasForeignKey<AnswerQuestion>(a => a.QuestionId);

			builder.HasMany<AnswerOption>(q => q.AnswerOptions)
	               .WithOne(o => o.AnswerQuestion)
	               .HasForeignKey(o => o.AnswerQuestionId)
	               .HasPrincipalKey(q => q.Id)
	               .OnDelete(DeleteBehavior.Cascade);
		}
    }

    public class AnswerOption_Configuration : IEntityTypeConfiguration<AnswerOption> 
    { 
        public void Configure(EntityTypeBuilder<AnswerOption> builder)
        {
            builder.HasOne(o => o.AnswerQuestion)
                   .WithMany()
                   .HasForeignKey(o => o.AnswerQuestionId);

            builder.HasOne(o => o.Option)
                   .WithOne()
                   .HasForeignKey<AnswerOption>(o => o.OptionId);
        }
    }
}
