import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.config';

interface UserAttributes {
  id: number;
  email: string;
  username?: string;
  passwordHash?: string;
  avatarUrl?: string;
  birthDate?: Date;
  firstName?: string;
  lastName?: string;
}

// Interface pour la création d'un utilisateur (sans l'id qui est auto-généré)
export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public username!: string | undefined;
    public passwordHash!: string | undefined;
    public avatarUrl!: string | undefined;
    public birthDate!: Date | undefined;
    public firstName!: string | undefined;
    public lastName!: string | undefined;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Important pour l'unicité des emails
      validate: {
        isEmail: true, // Validation d'email
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true, // Champ optionnel
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: true, // Sera activé dans la version finale
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users', // Correspond au nom de votre table
    timestamps: true, // Ajoute automatiquement les champs createdAt et updatedAt
  }
);