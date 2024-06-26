using Common.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class Role : Entity<Role>
{
	public override Guid Id { get; protected set; } = Guid.NewGuid();
	public SystemRoleType SystemRoleType { get; set; }
	public string Name { get; set; }
	public bool IsDeleteble { get; set; }
	public bool IsVisible { get; set; }

	protected Role()
	{

	}

	public Role( SystemRoleType systemRoleType, string name, bool isDeleteble) : this()
	{
		SystemRoleType = systemRoleType;
		Name = name;
		IsDeleteble = isDeleteble;
	}

	public override Role SetEntityId(Guid id)
	{
		this.Id = id;
		return this;
	}
}
