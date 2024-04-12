﻿using Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities;

public class Question
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid FormId { get; set; }
    public string Text { get; set; }
    public QuestionType Type { get; set; }
    public bool Open { get; set; }
    public bool Required { get; set; }
    public int Points { get; set; }
    public string AnswerKey { get; set; }
    public bool Answer { get; set; }
    public Form Form { get; set; }
    public ICollection<Option> Options{ get; set; }

    protected Question()
    { }

    public Question(Guid formId, string text, QuestionType type, bool open, bool required, int points, string answerKey, bool answer) : this()
    {
        FormId = formId;
        Text = text;
        Type = type;
        Open = open;
        Required = required;
        Points = points;
        AnswerKey = answerKey;
        Answer = answer;
    }
}