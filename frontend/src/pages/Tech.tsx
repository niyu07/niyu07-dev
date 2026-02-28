import TechHeader from "../components/tech/TechHeader";
import SkillList from "../components/tech/SkillList";
import ToolList from "../components/tech/ToolList";

export default function Tech() {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-20">
      <div className="max-w-6xl mx-auto">
        <TechHeader />
        <SkillList />
        <ToolList />
      </div>
    </div>
  );
}
