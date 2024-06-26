using Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Common.Context.FluentConfiguration;

public class FluentConfigurator
{
    public class Form_Configuration : IEntityTypeConfiguration<WhiteForm>
    {
        public void Configure(EntityTypeBuilder<WhiteForm> builder)
        {
            builder.HasMany<Question>(f => f.Questions)
                   .WithOne(q => q.Form)
                   .HasForeignKey(q => q.FormId)
                   .HasPrincipalKey(q => q.Id)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(f => f.Resource)
                   .WithMany()
                   .HasForeignKey(f => f.ResourceId);

			builder.HasOne(f => f.NameElementStyle)
                   .WithOne()
                   .HasForeignKey<WhiteForm>(i => i.NameElementStyleId)
                   .OnDelete(DeleteBehavior.ClientCascade);

			builder.HasOne(f => f.DescriptionElementStyle)
				   .WithOne()
				   .HasForeignKey<WhiteForm>(i => i.DescriptionElementStyleId)
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

            builder.HasOne(q => q.ImageWrapper)
                   .WithOne()
                   .HasForeignKey<Question>(q => q.ImageWrapperId)
                   .HasPrincipalKey<ImageWrapper>(i => i.Id)
				   .OnDelete(deleteBehavior: DeleteBehavior.ClientCascade);

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
            builder.HasOne(o => o.OptionElementStyle)
                   .WithOne()
                   .HasForeignKey<Option>(o => o.OptionElementStyleId)
                   .OnDelete(deleteBehavior: DeleteBehavior.ClientCascade);

			builder.HasOne(o => o.ImageWrapper)
				   .WithOne()
				   .HasForeignKey<Option>(o => o.ImageWrapperId)
				   .HasPrincipalKey<ImageWrapper>(i => i.Id)
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

			builder.HasOne(f => f.Resource)
	               .WithMany()
	               .HasForeignKey(f => f.ResourceId);

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
            builder.HasOne(o => o.Option)
                   .WithOne()
                   .HasForeignKey<AnswerOption>(o => o.OptionId);
        }
    }

    public class UserJoinRole_Configuration : IEntityTypeConfiguration<UserJoinRole> 
    { 
        public void Configure(EntityTypeBuilder<UserJoinRole> builder)
        {
			builder.HasKey(e => new { e.RoleId, e.Id });

			builder.HasOne(d => d.Role)
				   .WithMany()
				   .OnDelete(DeleteBehavior.ClientSetNull);
		}
    }

	public class User_Configuration : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.HasMany(e => e.UserJoinRole)
	               .WithOne()
	               .HasForeignKey(e => e.Id)
	               .OnDelete(DeleteBehavior.ClientSetNull);

			builder.HasMany(e => e.Resources)
	               .WithOne()
	               .HasForeignKey(e => e.UserId)
	               .OnDelete(DeleteBehavior.ClientSetNull);
		}
	}
}
