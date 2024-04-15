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
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }

    public class Question_Configuration : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.HasMany<Option>(q => q.Options)
                   .WithOne(opt => opt.Question)
                   .HasForeignKey(opt => opt.QuestionId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }

    public class Option_Configuration : IEntityTypeConfiguration<Option>
    {
        public void Configure(EntityTypeBuilder<Option> builder)
        {
        }
    }
}
