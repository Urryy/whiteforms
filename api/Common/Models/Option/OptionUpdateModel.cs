﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models.Option;

public class OptionUpdateModel
{
    public Guid Id { get; set; }
    public string Text { get; set; } = default!;
}
