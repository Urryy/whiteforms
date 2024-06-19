using Common.Context.FluentConfiguration;
using Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace Common.Context;

public class DatabaseContext : DbContext
{
    public DbSet<Form> Forms { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Option> Options { get; set; }
    public DbSet<ElementStyle> ElementStyles { get; set; }
    public DbSet<ImageWrapper> ImageWrappers { get; set; }
    public DbSet<AnswerForm> AnswerForms { get; set; }
    public DbSet<AnswerQuestion> AnswerQuestions { get; set; }
    public DbSet<AnswerOption> AnswerOptions { get; set; }

    public DatabaseContext(DbContextOptions<DatabaseContext> opt) : base(opt)
    {
        //Database.EnsureDeleted();
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new FluentConfigurator.Form_Configuration());
        modelBuilder.ApplyConfiguration(new FluentConfigurator.Question_Configuration());
        modelBuilder.ApplyConfiguration(new FluentConfigurator.Option_Configuration());
        modelBuilder.ApplyConfiguration(new FluentConfigurator.ImageWrapper_Configuration());
		modelBuilder.ApplyConfiguration(new FluentConfigurator.AnswerForm_Configuration());
		modelBuilder.ApplyConfiguration(new FluentConfigurator.AnswerQuestion_Configuration());
		modelBuilder.ApplyConfiguration(new FluentConfigurator.AnswerOption_Configuration());
	}
}
