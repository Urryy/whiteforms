using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class Resource : Entity<Resource>
{
	[Key]
	public override Guid Id { get; protected set; } = Guid.NewGuid();
	public string Name { get; init; }
	public bool IsActive { get; set; }
	public bool IsExternal { get; set; }
	public bool IsAuthorized { get; set; }
	public Guid? UserId { get; set; }
	public DateTime DateOfEmployment { get; set; }
	public DateTime? DateOfTermination { get; set; }

	protected Resource()
	{ }

	public Resource(bool isActive, bool isExternal, string name, DateTime dateOfEmployment)
		: this()
	{
		IsActive = isActive;
		IsExternal = isExternal;
		Name = name;
		DateOfEmployment = dateOfEmployment;
	}

	public override Resource SetEntityId(Guid id)
	{
		this.Id = id;
		return this;
	}
}
