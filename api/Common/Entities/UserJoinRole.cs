using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class UserJoinRole : Entity<UserJoinRole>
{
	[Column("UserId")]
	public override Guid Id { get; protected set; } = Guid.NewGuid();
	public Guid RoleId { get; set; }

	public Role Role { get; set; }

	public UserJoinRole()
	{

	}

	public override UserJoinRole SetEntityId(Guid id)
	{
		this.Id = id;
		return this;
	}
}
