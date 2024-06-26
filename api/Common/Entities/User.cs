using Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class User : Entity<User>
{
	[Key]
	public override Guid Id { get; protected set; } = Guid.NewGuid();
	public string Login { get; set; } = default!;
	public string Email { get; set; } = default!;
	public string Name { get; set; } = default!;
	public LoginType LoginType { get; set; }

	public ICollection<UserJoinRole> UserJoinRole { get; private set; }
	public ICollection<Resource> Resources { get; private set; }

	protected User()
	{
		UserJoinRole = new List<UserJoinRole>();
		Resources = new List<Resource>();
	}

	public User(Guid id, string login) : this()
	{
		if (string.IsNullOrWhiteSpace(login))
		{
			throw new ArgumentException("Login is null or empty", nameof(login));
		}

		Id = id;
		Login = login;
		LoginType = LoginType.Never;
	}

	public override User SetEntityId(Guid id)
	{
		this.Id = id;
		return this;
	}

	public Resource GetAuthorizedResource()
	{
		return Resources.FirstOrDefault(r => r.IsAuthorized && r.IsActive)
			   ?? Resources.FirstOrDefault(r => r.IsActive)
			   ?? throw new NullReferenceException("Resource by current user doesn't exist");
	}
}
