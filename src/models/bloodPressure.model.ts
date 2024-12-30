import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.config';
import { User } from './users.model'; // Importez le modèle User

interface BloodPressureAttributes {
  id: number;
  userId: number;
  systolic: number;
  diastolic: number;
  pulse?: number;
  measurementDate: Date;
  measurementTime?: string; // Type string pour l'heure (format HH:mm:ss)
  notes?: string;
}

export interface BloodPressureCreationAttributes extends Omit<BloodPressureAttributes, 'id'> {}

export class BloodPressure extends Model<BloodPressureAttributes, BloodPressureCreationAttributes> implements BloodPressureAttributes {
    public id!: number;
    public userId!: number;
    public systolic!: number;
    public diastolic!: number;
    public pulse!: number | undefined;
    public measurementDate!: Date;
    public measurementTime!: string | undefined;
    public notes!: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

BloodPressure.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { // Clé étrangère vers users
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE', // Suppression en cascade si l'utilisateur est supprimé
    },
    systolic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // Valeur minimale
      },
    },
    diastolic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    pulse: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    measurementDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    measurementTime: {
      type: DataTypes.TIME, // Ou DataTypes.STRING si vous préférez gérer le format vous-même
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'blood_pressure',
    timestamps: true,
  }
);