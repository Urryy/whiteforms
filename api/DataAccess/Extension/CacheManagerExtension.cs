using DataAccess.Managers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Extension;

public static class CacheManagerExtension 
{
	public static string KEY_ALL_ENTITIES = "ALLENTITY";
	public static string KEY_ENTITY = "ENTITY{0}";

	public static string GetAllEntityKey<T>() => KEY_ALL_ENTITIES + typeof(T).Name;
}
