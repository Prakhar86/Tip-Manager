'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const inlineScript = `IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Users](
  [ID] [int] IDENTITY(1,1) NOT NULL,
  [Name] [varchar] (255) NOT NULL,
  [Picture] [varchar] (255) NOT NULL,
[Email] [varchar] (255) NOT NULL,
[Password] [varchar] (255) NOT NULL,
   CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED (ID),
  )
END
GO

--

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Places]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Places](
  [ID] [int] IDENTITY(1,1) NOT NULL,
  [Place] [varchar] (255) NOT NULL,
CONSTRAINT [PK_Places] PRIMARY KEY CLUSTERED (ID),
  )
  END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TipRecords]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[TipRecords](
  [ID] [int] IDENTITY(1,1) NOT NULL,
  [UserID] [int] NOT NULL,
[PlaceID] [int] NOT NULL,
  [AmountPaid] money NOT NULL,
  [TipPercent] int NOT NULL,
  [Tip] money NOT NULL
  [CreatedDate] datetime default CURRENT_TIMESTAMP,
   CONSTRAINT [PK_TipRecords] PRIMARY KEY CLUSTERED (ID),
  CONSTRAINT [FK_Users_TipRecords] FOREIGN KEY (UserID)
  REFERENCES [dbo].[Users](ID),
  CONSTRAINT [FK_Places_TipRecords] FOREIGN KEY (PlaceID)
  REFERENCES [dbo].[Places](ID)
  )
  END
GO
---=========================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertUser]
@name varchar(150),
@picture varchar(150),
@email varchar(150),
@password varchar(150)
AS

--Inserts Payment
INSERT INTO Users
(Name,
Picture,
Email,
Password)
VALUES
(@name,
@picture,
@email,
@password)
GO
--====================
CREATE PROCEDURE [dbo].[getTips]
@startDate smalldatetime = Null,
@endDate smalldatetime = Null
AS

Select Tip, AmountPaid,(Select Place from Places where ID=PlaceID) as Place
from TipRecords
where CreatedDate Between @startDate +'12:00 AM' And @endDate + '11:59 PM'

GO

---==================================
CREATE PROCEDURE [dbo].[getMaxTipsCount]
@startDate smalldatetime = Null,
@endDate smalldatetime = Null
AS
with cte as (
Select TipPercent, Count(TipPercent) as tipCount
from TipRecords
where CreatedDate Between @startDate +'12:00 AM' And @endDate + '11:59 PM'
Group By TipPercent
)
Select cte.TipPercent, cte.tipCount
from cte
where cte.tipCount = (SELECT MAX(cte.tipCount) FROM cte)

`;
    console.log('initial db migration...');
    inlineScript.split('GO').forEach(async batch =>{
      try{
        process.stdout.write('.');
        await queryInterface.sequelize.query(batch);
      }
      catch (err) {
        console.log(batch);
        console.log(err);
      }
    });
    return;
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
