using Common.Context.FluentConfiguration;
using Common.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security;

namespace Common.Context;

public class DatabaseContext : DbContext
{
    public DbSet<WhiteForm> WhiteForms { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Option> Options { get; set; }
    public DbSet<ElementStyle> ElementStyles { get; set; }
    public DbSet<ImageWrapper> ImageWrappers { get; set; }
    public DbSet<AnswerForm> AnswerForms { get; set; }
    public DbSet<AnswerQuestion> AnswerQuestions { get; set; }
    public DbSet<AnswerOption> AnswerOptions { get; set; }
	public DbSet<Resource> Resources { get; set; }
	public DbSet<User> Users { get; set; }
	public DbSet<UserJoinRole> UserJoinRole { get; set; }
	public DbSet<Role> Roles { get; set; }

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
        modelBuilder.ApplyConfiguration(new FluentConfigurator.AnswerForm_Configuration());
        modelBuilder.ApplyConfiguration(new FluentConfigurator.AnswerQuestion_Configuration());
        modelBuilder.ApplyConfiguration(new FluentConfigurator.AnswerOption_Configuration());
		modelBuilder.ApplyConfiguration(new FluentConfigurator.User_Configuration());
		modelBuilder.ApplyConfiguration(new FluentConfigurator.UserJoinRole_Configuration());
	}
}
